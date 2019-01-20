import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  insertNewStudent(studentDetails) {
    return this.http.post(environment.STUDENT, studentDetails)
  }

  getStudents() { }

  getStudent(studentID) { 
    var path = environment.STUDENT + '/' + studentID
    return this.http.get(path)
  }

  getStudentByClass(className) {
    var path = environment.STUDENT + '/class/' + className
    return this.http.get(path)
  }

  deleteStudent(studentID) {
    var path = environment.STUDENT + '/' + studentID
    return this.http.delete(path)
  }

  updateStudent(studentDetails) {
    return this.http.put(environment.STUDENT, studentDetails)
  }

}
