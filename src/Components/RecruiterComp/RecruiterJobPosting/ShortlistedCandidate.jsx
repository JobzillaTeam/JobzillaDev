import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import InterviewStatusPopUp from './InterviewStatusPopUp.jsx';
import ApiServicesOrg from '../../../Services/ApiServicesOrg.jsx';

export default class ShortlistedCandidate extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            candidate1: [],
            visible:2,
            error:false,  
            candidateLength: '' 
        };
        this.ShortlistedCandidateService=new ApiServicesOrg()
        this.loadMore = this.loadMore.bind(this);
     }

    loadMore() {
        this.setState((prev) => {
          return {visible: prev.visible + 4};
        });
        
      }
    

      componentDidMount() {
        this.setState({ loading: true });
          this.ShortlistedCandidateService.getViewAllShortlistedCandidate()
          .then(Response =>  {
               if(Response.data.responseObject){
              
              this.setState({ 
              candidate1:Response.data.responseObject,
              candidateLength:Response.data.responseObject.length
             },
            //  this.loadMore(),
             
                  () =>{
                      console.log(this.state.candidate1)
                   }
              )
            }
        }
    );
}     
    onEditStatusModalRef = (obj) => {
        this.showModal = obj&&obj.showModal;
    }
    
    editStatus = (candidateId) => {
        localStorage.setItem("CandidateId",candidateId)
        this.showModal();
    }
   
    click(){
        alert(`hii`)
    }
    
    /**Download Resume */
    downloadResume = (candidateId) => {
        localStorage.setItem("downloadCandidateId",candidateId)
        // Calling Download Resume File Service from Service file:-
            var blob;
            this.ShortlistedCandidateService.downloadResumeFile1()
            .then(Response => {
                
                var data1=Response.data.responseObject
                blob = this.convertBase64toBlob(data1, 'application/msword'); 
                var blobURL = URL.createObjectURL(blob)
                var blobURL = URL.createObjectURL(blob);
                    window.open(blobURL); 
                })
               
            }
        
     convertBase64toBlob(content, contentType) {
        contentType = contentType || '';
        var sliceSize = 512;
        var byteCharacters = window.atob(content); //method which converts base64 to binary
        var byteArrays = [
        ];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          var byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, {
          type: contentType
        }); //statement which creates the blob
        return blob;
      }

      showProfile(candidateID){
        localStorage.setItem("candidateId",candidateID)
    }

      render() {
        
        return (
            <div className="datatable-editing-demo">
                <div>
                     <div className="Show">Total Result {this.state.candidateLength} </div>
                        {this.state.candidate1 ?
                            <table className="table table-borderless custom-table ">
                                <thead >
                                    <tr>
                                        <th>#</th>
                                        <th>Candidates</th>
                                        <th>Status<img src="/images/icons/Group 615.svg" alt="down arrow" className="pr-2"/></th>
                                        <th>Comments</th>
                                        <th>Last updated <img src="/images/icons/Group 615.svg" alt="down arrow" className="pr-2"/></th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.candidate1.slice(0,this.state.visible).map((data,index)=>
                                    <tr>
                                        <td>{data.candidate.candidateId}</td>
                                        <td>
                                            <Link to= "/candidateProfileToOpen" onClick={() => this.showProfile(data.candidate.candidateId)}><p className="tb-title-text">{data.candidate.firstName}</p> </Link>
                                            <p>{data.candidate.currentRole} at {data.candidate.company}</p>
                                            <p><i className="pi pi-envelope mr-2"></i>{data.candidate.emailId}</p>
                                            <p><i className="pi pi-mobile mr-2"></i>{data.candidate.mobileNumber}</p>
                                            <p><img src="/images/icons/location.svg" alt="location" className="pr-2"/>{data.candidate.address},{data.candidate.city}</p>
                                        </td>
                                        <td>           
                                            <InterviewStatusPopUp ref={this.onEditStatusModalRef} ></InterviewStatusPopUp> 
                                            <span className="mr-2"> {data.interviewStatus}</span>
                                            <img src="../images/icons/iconfinder_Edit-01_1976055.svg" onClick={()=> this.editStatus(data.candidate.candidateId)}></img>
                                        </td>
                                        <td>{data.comment}</td>
                                        <td>{data.lastUpdate}</td>
                                        <td>
                                            <button onClick={()=> this.downloadResume(data.candidate.candidateId)}><img  src="../images/icons/Group 555.svg"></img> Download Resume</button>
                                        </td>
                                    </tr>)}
                               </tbody>
                            </table>:<p>No Data Found</p>}
                        </div>
                        <button className="loadMore" onClick={this.loadMore}>Load More</button>
                    </div>       
            );
    }
}
                 




// import React from "react";
// import { render } from "react-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
// import {Link} from 'react-router-dom'
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';
// import { Toast } from 'primereact/toast';
// import ProductService from '../../../Services/ProductServices.js';
// import InterviewStatusPopUp from './InterviewStatusPopUp.jsx';
// import CandidateProfileToOpen from '../CandidateProfileToOpen'
// import ApiServicesOrg from '../../../Services/ApiServicesOrg.jsx';

// const style = {
//   height: 30,
//   border: "1px solid green",
//   margin: 6,
//   padding: 8
// };

// export default class ShortlistedCandidate extends React.Component {
//     constructor(){
//         super()
//   this.state = {
//    candidate1:[],
//    //candidate1:Array.from({length:3}),
//   //  candidate1: Array.from({ length: 20 }),
//     hasMore: true
//   };
//   this.ShortlistedCandidateService=new ApiServicesOrg()
// }

 

//   componentDidMount() {
      
//     this.setState({ loading: true });
//     this.ShortlistedCandidateService.getViewAllShortlistedCandidate()
//     .then(Response => this.setState({ 
//         candidate1:Response.data.responseObject,
        
//        },
//       //  this.loadMore(),
       
//             () =>{
//                 console.log(this.state.candidate1)
//              }
//         )
//     );
// }

//   fetchMoreData = () => {
//     if (this.state.candidate1.length >= 500) {
//       this.setState({ hasMore: false });
//       return;
//     }
//     // a fake async api call like which sends
//     // 20 more records in .5 secs
//     setTimeout(() => {
//       this.setState({
//         candidate1: this.state.candidate1.concat(Array.from({ length:2}))
//       });
//     }, 500);
//   };

//   onEditStatusModalRef = (obj) => {
//     this.showModal = obj&&obj.showModal;
// }

// editStatus = (candidateId) => {
//     localStorage.setItem("CandidateId",candidateId)
//     this.showModal();
// }

// click(){
//     alert(`hii`)
// }


// downloadResume = (candidateId) => {

  

//     localStorage.setItem("downloadCandidateId",candidateId)

//     // Calling Download Resume File Service from Service file:-
//         var blob;
//         this.ShortlistedCandidateService.downloadResumeFile1()
//         .then(Response => {
//             alert(`Hii from download`)
//             var data1=Response.data.responseObject
//             blob = this.convertBase64toBlob(data1, 'application/msword'); 
//             var blobURL = URL.createObjectURL(blob)
//             var blobURL = URL.createObjectURL(blob);
//                 window.open(blobURL); 
//             })
//             .catch(error => {
//                 console.log("Error Occured..", error)
//                 this.toast.show({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong', life: 2000 });
//               })
//         }
    
//  convertBase64toBlob(content, contentType) {
//     contentType = contentType || '';
//     var sliceSize = 512;
//     var byteCharacters = window.atob(content); //method which converts base64 to binary
//     var byteArrays = [
//     ];
//     for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//       var slice = byteCharacters.slice(offset, offset + sliceSize);
//       var byteNumbers = new Array(slice.length);
//       for (var i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }
//       var byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//     }
//     var blob = new Blob(byteArrays, {
//       type: contentType
//     }); //statement which creates the blob
//     return blob;
//   }

//   showProfile(candidateID){
//     localStorage.setItem("candidateId",candidateID)
// }

//   render() {
//     return (
//       <div>
      
//         <InfiniteScroll
//           dataLength={this.state.candidate1.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.hasMore}
          
//           loader={<h4>Loading...</h4>}
//           height={300}
//           endMessage={
//             <p style={{ textAlign: "center" }}>
//               <b>Yay! You have seen it all</b>
//             </p>
//           }
//         >  
//         <div className="Show">Total Result {[this.state.candidate1.length]} </div>
        
//               <table className="table table-borderless custom-table ">
                                           
//               <thead className="thead">
//                   <tr>
//                       <th>#</th>
//                       <th>Candidates</th>
//                       <th>Status<img src="/images/icons/Group 615.svg" alt="down arrow" className="pr-2"/></th>
//                       <th>Comments</th>
//                       <th>Last updated <img src="/images/icons/Group 615.svg" alt="down arrow" className="pr-2"/></th>
//                       <th></th>
//                   </tr>
//               </thead>
                  
//               {this.state.candidate1.map((data, index) => 
//               <tbody>
                  
               
            
//                   <tr>
//                       <td>{data.candidate.candidateId}</td>
//                       <td>
//                       <Link to= "/candidateProfileToOpen" onClick={() => this.showProfile(data.candidate.candidateId)}><p className="tb-title-text">{data.candidate.firstName}</p> </Link>
                         
//                           <p>{data.candidate.currentRole} at {data.candidate.company}</p>
//                           <p><i className="pi pi-envelope mr-2"></i>{data.candidate.emailId}</p>
//                           <p><i className="pi pi-mobile mr-2"></i>{data.candidate.mobileNumber}</p>
//                           <p><img src="/images/icons/location.svg" alt="location" className="pr-2"/>{data.candidate.address},{data.candidate.city}</p>
//                       </td>
               
//                       <td>
                     
//                       <InterviewStatusPopUp ref={this.onEditStatusModalRef} ></InterviewStatusPopUp> 
//                            <span className="mr-2"> {data.interviewStatus}</span>
                         
//                           <img src="../images/icons/iconfinder_Edit-01_1976055.svg" onClick={()=> this.editStatus(data.candidate.candidateId)}></img>
                         
//                        </td>
                 
                    
//                       <td>{data.comment}</td>
//                       <td>{data.lastUpdate}</td>
//                       <td>
//                         <a href=""onClick={()=> this.downloadResume(data.candidate.candidateId)}><img  src="../images/icons/Group 555.svg"></img> Download Resume</a>
//                       </td>

//                   </tr>
                 
                 
                
//               </tbody>
//                )}
              
//           </table>
         
//         </InfiniteScroll>
//       </div>
//     );
//   }
// }



 
