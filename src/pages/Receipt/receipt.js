import MetaTags from 'react-meta-tags';
// import { Col,Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
import axios from "axios"

import { MDBDataTable } from "mdbreact"

// import { Button, Container, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import { AvField, AvForm } from "availity-reactstrap-validation"
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
  } from "reactstrap"


function Receipt(){
    const [ColId, setColId] = useState("")
    const [setPhonePaid, setsetPhonePaid] = useState("")
    const [receiptAmount, setreceiptAmount] = useState("")
    const [BilId, setBilId] = useState("")
    const [apiData, setapiData] = useState("")
    const [updatedid, setupdatedid] = useState("")
    const [isEdit, setisEdit] = useState(false)
    const [Editid, setEditid] = useState("")
    const [showAlert, setshowAlert] = useState(false)
    const[subcat,setsubcat]= useState([])
    const[subcatCus,setsubcatCus]= useState([])
    const[subcatBil,setsubcatBil]= useState([])

    const [modalcategory, setModalcategory] = useState(false)

    let endpoint = "http://localhost:0808/receipt/"
    useEffect(() =>{
        const subget= async()=>{
            const sublist=await axios.get('http://localhost:0808/receipt/')
            const subdata=await sublist.data.Allreceipt
            setsubcat(subdata)
console.log(subdata)

const sublistCus = await axios.get('http://localhost:0808/custmer/')
const subdataCus = await sublistCus.data.AllCustmer
setsubcatCus(subdataCus)
console.log(subdataCus)


const biliglist=await axios.get('http://localhost:0808/biling/')
            
const subdataBil=await biliglist.data.AllBiling

setsubcatBil(subdataBil)
console.log(subdataBil)


        }
        subget()

    }, [])
    const handaleSubmit = async(e) => {
        
        e.preventDefault()
        let obj={
            Custmer_id: ColId,
            PhonePaid: setPhonePaid,
            receiptAmount: receiptAmount,
            Biling_id: BilId,
            
        }
        if (ColId==="") {
            toast.error("Enter Your Custmer ID")
                               
        } else if (setPhonePaid===""){
            toast.error("Enter Your phone")
            
        }else if (receiptAmount===""){
            toast.error("Enter Your Recept Amount")
            
        }
        else if (BilId===""){
            toast.error("Enter Your Biling ID")
            
        }
        else{
            toast.success("Receipt Added Successfully")

        }
 
        try {
            if (isEdit) {
                let updateEndPoint=`${endpoint}/${Editid}`
                console.log("updateEndPoint",updateEndPoint)

                const subdata = await axios.put(updateEndPoint,obj)
                 const updateData=apiData.filter((subdata)=>subdata._id!==Editid)
                    console.log("updateData",updateData) 
                if (subdata.data.status==="success") {
                   
                   
                    setapiData([subdata.info,...apiData])
                    
               } else {
                   toast.error(subdata.data)
                   
               }

            }else{
                // console.log("post need")
            }
           
            console.log(obj)
            const res = await axios.post(endpoint, obj)
            console.log(res.data)
            if (res.data.status==="success") {
                 
                 setapiData([...apiData,res.info])
                 
            } else {
                toast.error(res.data)
                
            }
            
        } catch (error) {
            console.log(error.message)
        }
    
    }


    const handleEdit =(subdata)=>{
        setColId(subdata.Custmer_id)
        setsetPhonePaid(subdata.PhonePaid)
        setreceiptAmount(subdata.receiptAmount)
        setBilId(subdata.Biling_id)
        setisEdit(true)
        setEditid(subdata._id)
        setModalcategory(true)

        console.log("subdata",subdata)
    }

    const handleDelete = (id) => {
        setshowAlert(true)
        // const confi=window.confirm('Are You sure delete')
        if (id) {
            axios.delete('http://localhost:0808/receipt/' + id)

            // setapiData(apiData.filter((subdata)=>subdata._id!==id))

        }


        console.log("handleDelete", id)
    }

    const toggleCategory = () => {
        setModalcategory(!modalcategory)
         setColId("")
      setsetPhonePaid("")
      setreceiptAmount("")
      setBilId("")
      setisEdit(false)
      }

      const data = {
        columns: [
        //   {
        //     label: "id",
        //     field: "_id",
        //     sort: "asc",
        //     width: 150,
        //   },
          {
            label: "Custmer name",
            field: "Custmer_name",
            sort: "asc",
            width: 150,
          },
          {
            label: "total",
            field: "total",
            sort: "asc",
            width: 270,
          },
          {
            label: "Total Amount Paid",
            field: "receiptAmount",
            sort: "asc",
            width: 100,
          },
          {
            label: "Balance",
            field: "Balance",
            sort: "asc",
            width: 200,
          },
          
          {
            label: "Receipt Status",
            field: "receiptStatus",
            sort: "asc",
            width: 100,
          },
          {
            label: "Action",
            field: "Action",
            sort: "asc",
            width: 100,
          },
        ],
        rows: subcat.map(subdata => {
            subdata.Custmer_name=subdata.Custmer_id?.name
            subdata.total=subdata.Biling_id?.total
            subdata.Balance=subdata.Biling_id?.Balance
            console.log(subdata)
            subdata.Action=(
                <div>
                    <button onClick={() => handleEdit(subdata)} class="btn btn-primary  mx-1">Edit</button>
                    <button onClick={(e) => handleDelete(subdata._id)} class="btn btn-danger mx-1">Delete</button>
                </div>
            )
            return(subdata)
        
      })}
    return(


         <div className="page-content">
           <MetaTags>
             <title>Receipt </title>
           </MetaTags>
          
             <div className="page-title-box">
              {/* <Row className="align-items-center"> */}
        <div>
            
                <ToastContainer></ToastContainer>
 <form onSubmit={handaleSubmit}>
            <div class="row mt-4">
                </div>
        </form>


        <Button
                          color="warning"
                          className="font-16  btn-block mb-3"
                          onClick={toggleCategory}
                        >
                          <i className="mdi mdi-plus-circle-outline"></i> Create New Receipt
                      </Button>


                      
                      <Modal
                        isOpen={modalcategory}
                        toggle={toggleCategory}
                        // className={props.className}
                      >
                        <ModalHeader toggle={toggleCategory} tag="h4">
                          Add a Receipt
                        </ModalHeader>
                        <ModalBody>
                          <AvForm
                            onValidSubmit={handaleSubmit}
                          >
                            <Row form>


                 <div class="col-12">
                            <div class="form-group">
                            <label for="exampleInputEmail1">Select Custmer</label>
                           
                                 <select id='inputsate'
                                  className='form-control '
                                  value={ColId}
                                  onChange={(event) => {
                                    setColId(event.target.value)
                                }}
                                  >
                                <option value={""}>chone Collector</option>
                                {subcatCus?.map((subdataCus)=>{
                                    return<option value={subdataCus._id}>{subdataCus.name}</option>
                                })}
                                
                               </select>
                             

                            </div>

                        </div> 
                 <div class="col-12">
                            <div class="form-group">
                            <label for="exampleInputEmail1">Select Biling</label>
                           
                                 <select id='inputsate'
                                  className='form-control '
                                  value={BilId}
                                  onChange={(event) => {
                                    setBilId(event.target.value)
                                }}
                                  >
                                <option value={""}>chone Collector</option>
                                {subcatBil?.map((subdataBil)=>{
                                    return<option value={subdataBil._id}>{subdataBil.Custmer_id.name}</option>
                                })}
                                
                               </select>
                             

                            </div>

                        </div> 

                
                {/* <div class="col-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Biling id</label>
                        <input
                            type="text"
                            class="form-control"
                            name="number"
                            value={BilId}
                            aria-describedby="emailhelp"
                            placeholder="Enter Your Age"
                            onChange={(event) => {
                                setBilId(event.target.value)
                            }}

                            />
            
                    </div>

                </div> */}
                <div class="col-12">
                    <div class="form-group">
                        <label for="exampleInputPassword1">phone Paid</label>
                        <input
                        type="number"
                        class="form-control"
                        id="exampleInputPassword1"
                        value={setPhonePaid}
                        placeholder="Enter Your Phone Number"
                        onChange={(event) => {
                            setsetPhonePaid(event.target.value)
                        }}
                        />



                    </div>

                </div>




                <div class="col-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Receipt Amount</label>
                        <input
                            type="text"
                            class="form-control"
                            name="receipt"
                            value={receiptAmount}
                            aria-describedby="emailhelp"
                            placeholder="Enter Yuor Address"
                            onChange={(event) => {
                                setreceiptAmount(event.target.value)
                            }}
                            />
            
                    </div>

                </div>
              
                
                            </Row>
                            <Row>
                              <Col>
                                <div className="text-right mt-4 ">
                                  <button
                                    type="button"
                                    className="btn btn-light me-2"
                                    onClick={toggleCategory}
                                  >
                                    Close
                                  </button>
                                  <button onClick={handaleSubmit} type="submit" class="btn btn-warning ">
                                    submit
                                </button>

                                  {/* <button
                                    type="submit"
                                    className="btn btn-success save-event"
                                  >
                                    Save
                                  </button> */}
                                </div>
                              </Col>
                            </Row>
                          </AvForm>
                        </ModalBody>
                      </Modal>
                      <MDBDataTable responsive bordered data={data} />
                      {showAlert ? (
                            <SweetAlert
                                title="Are you Sure?"
                                warning
                                showCancel
                                confirmBtnCssClass="success"
                                cancelBtnCssClass="danger"
                                onConfirm={(id) => {

                                    const deletes = async (id) => {
                                        try {
                                            const confi = window.confirm('Are You sure delete')
                                            if (confi) {
                                                // axios.delete("http://localhost:0808/custmer/" + id)

                                                // setapiData(apiData.filter((subdata)=>subdata._id!==id))
                                                toast.success("Receipt Deleted Successfully ")

                                            }

                                            // const res=await axios.delete(`${endpoint}/${id}`)    

                                            // console.log("res",res)



                                        } catch (error) {
                                            console.log("error", error)
                                        }





                                    }


                                    setshowAlert(false)
                                    toast.success("Receipt Deleted Successfully ")



                                }}
                                onCancel={() => {
                                    setshowAlert(false)

                                }}
                            >

                            </SweetAlert>
                        ) : null}

            <Container>

                
            {/* <div class="containar-fluid mt-3">
    <div class="card">
        <div class="card-header bg-primary p-2 fs-5  text-white">Receipt List</div>
        <div class="card-body">
        <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                    <thead>
                <tr>
      <th scope="col">Receipt ID</th>
      <th scope="col">Custmer name</th>
      <th scope="col">total</th>
      <th scope="col">Balance</th>
      <th scope="col">TotalAmountPaid</th>
      <th scope="col">receiptStatus</th>
          <th scope="col">Action</th>
      
      
    </tr>   
 </thead>

    <tbody>
                   
    {subcat?.map(subdata=>{
     return(
        <tr>
        <td>{subdata._id}</td>
        <td>{subdata.Custmer_id?.name}</td>
        <td>{subdata.Biling_id?.total}</td>
        <td>{subdata.Biling_id?.Balance}</td>
        <td>{subdata.receiptAmount}</td>
        <td>{subdata.receiptStatus}</td>
        <td><button onClick={()=>handleEdit(subdata) } class="btn btn-primary  mx-1">edit</button>
             <button onClick={(e)=>handleDelete(subdata._id)} class="btn btn-danger mx-1">Delete</button>
        </td>
        </tr>
         )
        })}

                </tbody>
                </table>
                {showAlert ?(
                             <SweetAlert
                        title="Are you Sure?"
                        warning
                        showCancel
                        confirmBtnCssClass="success"
                        cancelBtnCssClass="danger"
                        onConfirm={(id) => {

                            const deletes = async (id) => {
                                try {
                                    const confi = window.confirm('Are You sure delete')
                                    if (confi) {
                                        // axios.delete("http://localhost:0808/custmer/" + id)

                                        // setapiData(apiData.filter((subdata)=>subdata._id!==id))
                                        toast.success("Receipt Deleted Successfully ")

                                    }

                                    // const res=await axios.delete(`${endpoint}/${id}`)    

                                    // console.log("res",res)



                                } catch (error) {
                                    console.log("error", error)
                                }





                            }


                            setshowAlert(false)
                            toast.success("Customer Deleted Successfully ")



                        }}
                        onCancel={()=>{
                            setshowAlert(false)

                        }}
                        >
                            
                        </SweetAlert>
                        ):null}

                
</div>
</div>
</div> */}
                    
            </Container>
        </div>

                      {/* </Row> */}
</div> 
</div>

    )
}

export default Receipt;
