import { Component, OnInit } from '@angular/core';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss'],
})
export class CvListComponent implements OnInit {
  cvList: any[] = []; // Holds the list of CVs
  isLoading = true;   // Loading indicator

  constructor(private cvService: CvService) {}

  ngOnInit(): void {
    this.fetchCVs(); // Fetch CVs when the component loads
  }

  // Fetch CVs from the API
  fetchCVs(): void {
    this.cvService.getCVs().subscribe({
      next: (data) => {
        this.cvList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching CVs:', err);
        this.isLoading = false;
      },
    });
  }

  // Navigate to the edit page with the CV ID
  editCV(id: number): void {
    // This assumes you have routing set up to navigate to '/edit/:id'
    window.location.href = `/edit/${id}`;
  }

  // Delete a CV and refresh the list
  deleteCV(id: number): void {
    if (confirm('Are you sure you want to delete this CV?')) {
      this.cvService.deleteCV(id).subscribe({
        next: () => {
          this.cvList = this.cvList.filter((cv) => cv.id !== id); // Remove deleted CV
          alert('CV deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting CV:', err);
          alert('Failed to delete CV. Please try again.');
        },
      });
    }
  }
}
