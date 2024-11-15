import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss'],
})
export class CvFormComponent implements OnInit {
  cvForm: FormGroup; 
  isEditMode = false; 
  cvId: number | null = null; 

  constructor(
    private fb: FormBuilder,
    private cvService: CvService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cvForm = this.fb.group({
      name: ['', [Validators.required]], 
      fullName: ['', [Validators.required]], 
      email: [
        '',
        [Validators.required, Validators.email], 
      ],
      cityName: [''], 
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')], 
      ],
      companyName: [
        '',
        [Validators.required, Validators.maxLength(20)], 
      ],
      City: [''], 
      companyField: [''],
    });
  }

  ngOnInit(): void {
    
    this.cvId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.cvId) {
      this.isEditMode = true;
      this.loadCV(this.cvId);
    }
  }

  // Load CV data for editing
  loadCV(id: number): void {
    this.cvService.getCVById(id).subscribe({
      next: (cv) => {
        this.cvForm.patchValue({
          name: cv.name,
          fullName : cv.fullName,
          email: cv.email,
          cityName: cv.cityName,
          mobileNumber: cv.mobileNumber,
          companyName: cv.companyName,
          City: cv.city,
          companyField: cv.companyField,
        });
      },
      error: (err) => console.error('Error loading CV:', err),
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.cvForm.invalid) {
      return;
    }

    const formData = {
        id:this.cvId,
        name: this.cvForm.value.name,
        fullName : this.cvForm.value.fullName,
        email: this.cvForm.value.email,
        cityName: this.cvForm.value.cityName,
        mobileNumber: this.cvForm.value.mobileNumber,
        companyName: this.cvForm.value.companyName,
        city: this.cvForm.value.City,
        companyField: this.cvForm.value.companyField,
    };

    if (this.isEditMode && this.cvId) {
      // Update CV
      this.cvService.createOrUpdateCV(formData).subscribe({
        next: () => {
          alert('CV Updated successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error upadting CV:', err),
      });
    } else {
      // Create new CV
      this.cvService.createOrUpdateCV(formData).subscribe({
        next: () => {
          alert('CV created successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error creating CV:', err),
      });
    }
  }
}
