export type Gender = 'Male' | 'Female' | 'Other';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export interface UserProfile {
  id: string;
  name: string;
  dob: string;
  bloodGroup: BloodGroup;
  gender: Gender;
  mobile: string;
  email: string;
  wardNumber: number;
  wardName: string;
  streetName: string;
  community: string;
  isLoggedIn: boolean;
  avatarUrl: string;
}

export interface WardInfo {
  number: number;
  name: string;
  community: string;
  councilorName: string;
  councilorPhone: string;
  councilorEmail: string;
  engineerName: string;
  engineerPhone: string;
}

export interface FeedPost {
  id: string;
  authorName: string;
  authorWard: string;
  authorAvatar: string;
  timestamp: string;
  content: string;
  category: 'General' | 'Civic Issue' | 'Event' | 'Announcement' | 'Alert';
  images?: string[];
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  comments?: { id: string; author: string; text: string; time: string }[];
  wardTag: string;
  audience: 'My Ward' | 'All Avadi';
  isEmergencyBlood?: boolean;
  bloodGroupNeeded?: string;
  hospitalName?: string;
  contactNumber?: string;
}

export type ComplaintStatus = 'Submitted' | 'Action Initiated' | 'In Progress' | 'Resolved';

export interface ComplaintTimelineStep {
  status: ComplaintStatus;
  date: string;
  description: string;
  isDone: boolean;
}

export interface CivicComplaint {
  id: string;
  issueId: string; // e.g. AVD-2026-8942
  category: 'Streetlight' | 'Water Issue' | 'Garbage' | 'Drainage' | 'Roads & Potholes' | 'Others';
  description: string;
  images: string[];
  address: string;
  wardNumber: number;
  wardName: string;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  assignedOfficial: string;
  officialPhone: string;
  timeline: ComplaintTimelineStep[];
}

export interface ExplorePlace {
  id: string;
  name: string;
  category: 'Devotional' | 'Shopping Areas' | 'Kids Park' | 'Famous Areas' | 'Lake & Nature' | 'Defense & Heritage';
  image: string;
  rating: number;
  openingHours: string;
  location: string;
  description: string;
  ward: string;
  mapUrl: string;
}

export interface FoodOutlet {
  id: string;
  name: string;
  category: 'Veg' | 'Non-Veg' | 'Ice Cream Shops' | 'Late-Night Food Shops' | 'Snacks & Tea';
  image: string;
  rating: number;
  address: string;
  ward: string;
  timings: string;
  isLateNight: boolean;
  specialty: string;
  phone: string;
}

export interface ServiceWorker {
  id: string;
  name: string;
  serviceType: 'Electrician' | 'Plumber' | 'Carpenter' | 'AC Service' | 'Home Maid' | 'RO Repair' | 'Painter';
  photo: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  verified: boolean;
  phone: string;
  ward: string;
  charges: string;
}

export interface RentalProperty {
  id: string;
  title: string;
  propertyType: '1BHK' | '2BHK' | '3BHK' | 'Commercial Shop' | 'Plot / Land';
  rent: string;
  deposit: string;
  image: string;
  address: string;
  ward: string;
  amenities: string[];
  ownerName: string;
  phone: string;
  postedDate: string;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  salary: string;
  jobType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Work from Home' | 'Entry Level';
  location: string;
  ward: string;
  requirements: string[];
  contactPhone: string;
  postedDate: string;
  category?: string;
}

export interface BusSchedule {
  routeNo: string;
  origin: string;
  destination: string;
  via: string;
  frequency: string;
  nextBus: string;
  nearbyStop: string;
}

export interface TrainSchedule {
  trainNo: string;
  trainName: string;
  departure: string;
  destination: string;
  platform: string;
  frequency: string;
}
