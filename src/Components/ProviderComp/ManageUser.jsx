import React, { Component ,Fragment} from 'react';
import axios from 'axios';
import HeaderAll from '../CommonComp/HeaderAll'
import Footer from '../CommonComp/Footer'
import ApiServicesOrg from '../../Services/ApiServicesOrg'
import AddUser from '../ProviderComp/AddUser'
import EditUser from '../ProviderComp/EditUser'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import LeftNavProvider from '../CommonComp/LeftNavProvider'
import { Toast } from 'primereact/toast';

import { Button } from 'primereact/button';

import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';



class ManageUser extends Component{
    
    constructor(){
        super();

        this.state = {       

            users: null,
            userDialog: false,
            deleteUserDialog: false,
            deleteUsersDialog: false,
            user: {
                id:'',
                userName:'',
                email:'',
                contactNumber:'',
                userRole:''
            },
            selectedUsers: null,
            submitted: false,
            globalFilter: null
            
            
        }
        this.userService = new ApiServicesOrg();

        this.editUser = this.editUser.bind(this);
        this.confirmDeleteUser = this.confirmDeleteUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.onaAddUSerModalRef= this.onaAddUSerModalRef.bind(this);

        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.hideDeleteUserDialog = this.hideDeleteUserDialog.bind(this);
        this.hideDeleteUsersDialog = this.hideDeleteUsersDialog.bind(this);
        this.deleteSelectedUsers = this.deleteSelectedUsers.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        
        }
        componentDidMount() {
            // Calling Download Sample File Service from Service file:-
      
            this.userService.getViewAllUser()
            .then(Response => {
                if (Response && Response.data && Response.data.responseObject) {
                    const myUser = JSON.parse(localStorage.getItem('userDetails')).id;
                   
                    const selfUser= Response.data.responseObject; 
                    
                    this.setState({
                        users: selfUser.filter(selfUserId=> selfUserId.id != myUser && !selfUserId.isDeleted)
                    });
                }
            });
            
       }

    //    componentDidUpdate(){
    //         // Calling Download Sample File Service from Service file:-
    //         this.userService.getViewAllUser()
    //         .then(Response => {
    //             const myUser = JSON.parse(localStorage.getItem('userDetails')).id;
               
    //             const selfUser= Response.data.responseObject; 
               
    //             this.setState(
    //             { users: selfUser.filter(selfUserId=> selfUserId.id != myUser)}
    //         )});
    //         // .then(Response => this.setState({ users: Response.data.responseObject }
    //         //     ));

    //    }


       editUser(user){
        this.setState({
            user: { ...user },
            userDialog: true
        });
    }

       confirmDeleteUser(user) {
        this.setState({
            user,
            deleteUserDialog: true
        });
    }

    hideDeleteUserDialog() {
        this.setState({ deleteUserDialog: false });
    }
    
    deleteUser() {
    
        //Calling  File Service delete single data from Service file:- 
        this.userService.deleteUser(this.state.user.id)
        .then(Response=> {window.location.reload()})
        .catch(error=>{console.log("Error Occured...",error)})
        this.toast.show({severity: 'success', summary: 'Success Message', detail: 'User deleted Successfully'},50000);
        
        let users = this.state.users.filter(val => val.id !== this.state.user.id);
        this.setState({
        users,
        deleteUserDialog: false,
    });
}


    hideDeleteUsersDialog() {
        this.setState({ deleteUsersDialog: false });
    }

    deleteSelectedUsers() {
        const updatedUserId=[]
        // console.log(this.state.selectedUsers)
        const data = this.state.selectedUsers.map((user)=>
        updatedUserId.push(user.id))
        console.log(updatedUserId)

        //API call for multiple delete  {data: {userIds: updatedUserId}}, options)
        //Calling  File Service delete single data from Service file:- 
        this.userService.deleteMultiUser(updatedUserId)
        .then(Response=>{console.log("Success..",Response)})
        .catch(error=>{console.log("Error Occured...",error)})

        this.toast.show({severity: 'success', summary: 'Success Message', detail: 'User deleted Successfully'},50000);
        
    let users = this.state.users.filter(val => 
        !this.state.selectedUsers.includes(val));
        
    this.setState({
        //arr:{...selectedUsers},
        users,
        deleteUsersDialog: false,
        selectedUsers: null
    });
}
    confirmDeleteSelected(User) {
        this.setState({ 
            deleteUsersDialog: true });
    }


       actionBodyTemplate(rowData) {
        return (
            <>
                <EditUser ref={this.onEditUserModalRef} ></EditUser>
                <i className="fa fa-pencil-square-o pr-3" aria-hidden="true"  onClick={() => this.editUser(rowData)} />
                <i className="fa fa-trash-o" aria-hidden="true" onClick={() => this.confirmDeleteUser(rowData)} />
            </>
        );
    }

    onaAddUSerModalRef = (obj) => { 
        this.showModal = obj&&obj.showModal 
     }
     
     onAddUserClick = () => {
       this.showModal();
     }
     onEditUserModalRef = (obj) => {
        this.Model = obj&&obj.Model;
     }
     
     editUser =(user)=> {
      this.setState({
            user: { ...user },
            //userDialog: true  
        },()=> {console.log(this.state.user)});

         this.Model(user);
     }
       render(){

        const paginatorLeft = <Button icon="pi pi-refresh"/>;
        const header = (
            <div className="table-header d-flex justify-content-between ">
                <div className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText onInput={(e) => this.setState({ globalFilter: e.target.value })}type="search" placeholder="Search by Name, EmailId..." />
                </div>
                <div className="tbl-hdr-btn">
                <AddUser ref={this.onaAddUSerModalRef} ></AddUser>
                    <button className="btn btn-blue mr-2" onClick={this.onAddUserClick}>Add User</button>
                    <button className="btn btn-border" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedUsers || !this.state.selectedUsers.length}>Delete</button>
                </div>
            </div>
        );
               
        

        const deleteUserDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteUserDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteUser} />
            </>
        );


        const deleteUsersDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteUsersDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedUsers} />
            </>
   
        );
           return(
            <Fragment>
                <LeftNavProvider></LeftNavProvider>
				<div className="maincontent">
            <div className="content">
                {/*  Header */}
                <HeaderAll></HeaderAll>
                {/* Main Content on the page */}
                <div className="content_section main">
                <Toast ref={(el) => this.toast = el} />
                    <div className="mt-3">
                        <h4>Manage Users</h4>
                        <p className="mb-0">Recruitment is not a one-person job; therefore, we have got you covered! </p>
                        <p>The organization representative can create accounts here whom they want managing their roles and permission as admin/user.</p>
                        <section className="white-middle-section mt-4">                               
                            <div>                                
                            
               <DataTable ref={(el) => this.dt = el} className="p-datatable-striped " value={this.state.users} selection={this.state.selectedUsers} onSelectionChange={(e) => this.setState({ selectedUsers: e.value })} paginator={true} 
       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" rows={5} rowsPerPageOptions={[5,10,15]}  removableSort={true} sortMode="multiple"
       globalFilter={this.state.globalFilter}
       header={header} >
                    

<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
{/* <Column field="id" header="#"  style={{width:'6%'}}  sortable></Column> */}
<Column field="userName" header="Name" style={{width:'15%'}} sortable></Column>
 <Column field="email" header="EmailId" style={{width:'25%'}} sortable></Column>
                       
 <Column field="contactNumber" header="Contact"  sortable></Column>
                        
                       
<Column field="userRole" header="Role"  style={{width:'15%'}} sortable></Column>
<EditUser ref={this.onaEditUSerModalRef} ></EditUser>
<Column header="Action" body={this.actionBodyTemplate}></Column>
                </DataTable>
           </div>

           <Dialog visible={this.state.deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={this.hideDeleteUserDialog}>
            <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.user && <span>Are you sure you want to delete <b>{this.state.user.name}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteUsersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={this.hideDeleteUsersDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.user && <span>Are you sure you want to delete </span>}
                    </div>
                </Dialog>
           

                </section>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>  
                </div>
            </Fragment>
        )
    }
}
    export default ManageUser
