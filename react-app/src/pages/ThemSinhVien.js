import React from 'react';
import axios from "axios";
import '../pages/sinhvien.css'
const ip_Public = "http://localhost:3001";
let student_data = {
            id:1,
            ma_sinhvien: "",
            ten_sinhvien: "",
            ngay_sinh: "",
            avatar:"",
};
class ThemSinhVien extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:1,
            ma_sinhvien: "",
            ten_sinhvien: "",
            ngay_sinh: "",
            student: [{}],
            avatar:"",
            redirect:0,  
        };
    }
    onChange = (evt) =>{
        evt.preventDefault();
        this.setState({
            [evt.target.name] : evt.target.value,
        });
    };
    componentWillMount() {
		this.getAllStudent();
	};
    getAllStudent = (evt) =>{
        const config = {
            headers:{
                "Content-Type" : "application/json",
            },
        };
        var headers = new Headers();
		headers.append("Content-Type", "application/json");
        fetch(ip_Public+`/api/getALLSinhVien`,{
            method:"GET",
            headers:headers,
        })
        .then((response) => response.json())
        .then((result) =>{
            this.setState({
                student: result.response,
            })
        })
        .catch((error) => console.log("error", error));
    };
    submitThemStudent = (evt) =>{
        evt.preventDefault();
        const {id,ma_sinhvien,ten_sinhvien,ngay_sinh,avatar} = this.state;
        const config = {
            headers:{
                "Content-Type" : "application/json",
            },
        };
        const body = JSON.stringify({id,ma_sinhvien,ten_sinhvien,ngay_sinh,avatar});
        axios
            .post(ip_Public+`/api/addSinhVien`,body,config)
            .then((res) =>{
                if(res.data.msg == "true"){
                    alert("Thêm thành công sinh viên :",this.state.ma_sinhvien);
                }
                else{
                    alert("Lỗi khi thêm sinh viên!!!!");
                }
                this.getAllStudent(evt);
            });
    };
    deleteStudent = (evt,id,ma_sinhvien) => {
        evt.preventDefault();
        const config = {
            headers:{
                "Content-Type":"application/json",
            },
        };
        const body = JSON.stringify({id,ma_sinhvien});
        axios
            .post(ip_Public+`/api/deleteStudent`,body,config)
            .then((res)=>{
                if(res.data.msg == "true"){
                    alert("Xóa thành công sinh viên"+ ma_sinhvien);
                }
                else{
                    alert("Lỗi không thể xóa sinh viên");
                }
                this.getAllStudent(evt);
            });
    };
    updateStudent = (evt,id,ma_sinhvien,ten_sinhvien,ngay_sinh,avatar)=>{
        evt.preventDefault();
        const config = {
            headers :{
                "Content-Type":"application/json",
            },
        };
        const body = JSON.stringify({id,ma_sinhvien,ten_sinhvien,ngay_sinh,avatar});
        axios
            .post(ip_Public+`/api/updateSinhVien`,body,config)
            .then((res)=>{
                if(res.data.msg == "true"){
                    alert("Cập nhật thành công sinh viên" +  ma_sinhvien);
                }
                else{
                    alert("Lỗi khi cập nhật sinh viên !!!");
                }
                
            });
    };
    searchSinhVien = (evt) =>{
        evt.preventDefault();
        const config = {
            headers :{
                "Content-Type":"application/json",
            },
        };
        const ten_sinhvien = this.state.ten_sinhvien;
        const body = JSON.stringify({ten_sinhvien});
        // console.log(ten_sinhvien);
        axios.post(ip_Public+`/api/getStudentByTen`,body,config)
        // .then((res)=>res.json())
            .then((res)=>{
                console.log("ket qua:"+res.data.msg);
                const dulieu = res.data.msg;
                console.log("json"+ JSON.stringify({dulieu}));
                this.setState({
                    student: dulieu,
                })
            });
    };
    renderFormUpdateStudent =(evt,student)=>{
        evt.preventDefault();
        student_data = student;
        this.setState({
            redirect : 1
        });
    };
    render(){
        // const student = Array.from(this.state.student);
        const {ten_sinhvien,ngay_sinh,avatar} = this.state;
        if(this.state.redirect == 1){
            return(
                <div>
                    <form>
                        <span>Tên sinh viên:    </span>
                        <input 
                            type="text" 
                            name="ten_sinhvien" 
                           // value={student_data.ten_sinhvien} 
                            onChange={this.onChange}/>
                        <br/><br/>
                        <span>Ngày sinh:    </span>
                        <input 
                            type="text" 
                            name="ngay_sinh" 
                           // value={student_data.ngay_sinh} 
                            onChange={this.onChange}/>
                        <br/><br/>
                        <span>Avatar:   </span>
                        <input 
                            type="file" 
                            name="avatar" 
                           // value={student_data.avatar} 
                            onChange={this.onChange}/>
                        <br/><br/>
                        <input 
                            type="submit" 
                            value="Cập nhật sinh viên" 
                            onClick={(evt)=>this.updateStudent(evt,student_data.id,student_data.ma_sinhvien,ten_sinhvien,ngay_sinh,avatar)}/>
                    </form>
                </div>
            );
        }
        else if(this.state.redirect == 0){
            return(
                <div>
                    <div className="form_ThemSV">
                        <form>
                            <span>Mã sinh viên: </span>
                            <input 
                                name= "ma_sinhvien"
                                placeholder="Nhập mã sinh viên"
                                type="text"
                                onChange={this.onChange}
                                value = {this.state.ma_sinhvien}
                            />
                            <br/>
                            <span>Tên sinh viên: </span>
                            <input
                                name="ten_sinhvien"
                                placeholder="Nhập tên sinh viên"
                                type="text"
                                onChange = {this.onChange}
                                value = {this.state.ten_sinhvien}
                            />
                            <br/>
                            <span >Ngày sinh: </span>
                            <input
                                className="ngaysinh"
                                name="ngay_sinh"
                                placeholder="Nhập ngày sinh"
                                type="text"
                                onChange = {this.onChange}
                                value = {this.state.ngay_sinh}
                            />
                            <br/>
                            <br/>
                            <span>Avatar: </span>
                            <input
                                name="avatar"
                                placeholder="Chọn ảnh"
                                type="file"
                                onChange = {this.onChange}
                                value = {this.state.avatar}
                            />
                            <br/> <br/>
                            <button type="submit" onClick={(evt) => this.submitThemStudent(evt)}>Thêm Sinh Viên</button>
                        </form>
                        <br/><br/><br/>
                        <form>
                            <p>Tìm kiếm sinh viên theo tên</p>
                            <span>Nhập tên sinh viên:</span>
                            <input
                                name ="ten_sinhvien"
                                placeholder="Nhập tên sinh viên cần tìm kiếm"
                                type= "text"
                                onChange ={this.onChange}
                            />
                            <button type="submit" onClick={(evt)=> this.searchSinhVien(evt)}>Tìm kiếm</button>
                        </form>
                    </div>
                    
                    <br/>
                    <br/>
                    
                        
                    
                    <br/>
                    <table border = "1">
                        <thead>
                            <tr>
                                <th>Mã sinh viên</th>
                                <th>Tên sinh viên</th>
                                <th>Ngày sinh</th>
                                <th>Avatar</th>
                                <th>Sửa thông tin</th>
                                <th>Xóa Student</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.student.map((student)=>{
                                 return(
                                    <tr>
                                        <td>{student.ma_sinhvien}</td>
                                        <td>{student.ten_sinhvien}</td>
                                        <td>{student.ngay_sinh}</td>
                                        <td>{student.avatar}</td>
                                        <td>
                                            <form>
                                                <input className="btnEdit" type="submit" onClick={(evt)=>this.renderFormUpdateStudent(evt,student)}  value="Sửa"/>
                                            </form>
                                            
                                        </td>
                                        <td>
                                            <form>
                                                <input className="btnDelete" type="submit" onClick={(evt)=>this.deleteStudent(evt,student.id,student.ma_sinhvien)} value="Xóa"/>
                                            </form>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
        )};    
    }
}
export default ThemSinhVien;