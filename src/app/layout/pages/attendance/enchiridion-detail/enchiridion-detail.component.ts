import { EnchiridionService } from '../enchiridion/enchiridion.service';
import { PeoplesService } from './../../registre/peoples/peoples.service';
// import { EnchiridionService } from '../enchiridion/enchiridion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { saveAs } from 'file-saver';

import { AppointmentService } from '../appointment/appointment.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'smartpsi-prontuario-detail',
  templateUrl: './enchiridion-detail.component.html',
  styleUrls: ['./enchiridion-detail.component.less']
})
export class EnchiridionDetailComponent implements OnInit {

  public Editor = ClassicEditor;

  public collection: any = [];

  public component: any = {};

  public loadingSave: boolean;
  public loadingPDF: boolean;

  constructor(
    private router: ActivatedRoute,
    private peoplesService: PeoplesService,
    private enchiridionService: EnchiridionService,
    private appointmentService: AppointmentService,
  ) { }

  ngOnInit(): void {
    this.component.id = this.router.snapshot.params.id;
    this.show();
    this.loadEnchiridion();
  }

  show() {
    this.peoplesService.show(this.component.id).subscribe(response => {
      this.component = response;
    });
  }

  loadEnchiridion() {

    const params: any = {};

    params.status = ['OPEN', 'CONCLUDED'];
    params.peoplesId = this.component.id;

    this.appointmentService.index(params).subscribe(response => {
      this.collection = response;
    }, err => { });
  }

  update(data) {
    this.loadingSave = true;
    const body = {
      id: data.id,
      comments: data.comments
    };

    this.appointmentService.update(body).subscribe(response => {
      this.loadingSave = false;
    }, err => {
      this.loadingSave = false;
    });
  }

  getReportPdf(data = null) {
    let params: any;


    if (data) {
      params = { id: data.id };
    } else {
      params = { peoplesId: this.component.id };
    }

    this.loadingPDF = true;
    this.appointmentService.getReportPdf(params).subscribe(response => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      saveAs(blob, `${this.component.name} [Protuario].pdf`);
      this.loadingPDF = false;

    }, err => {
      this.loadingPDF = false;
    });
  }

  getReportPdfClient() {

    this.loadingPDF = true;
    this.appointmentService.getReportPdfClient(this.component.id).subscribe(response => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      saveAs(blob, `${this.component.name} [dados].pdf`);
      this.loadingPDF = false;

    }, err => {
      this.loadingPDF = false;
    });
  }

}
