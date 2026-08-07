export interface Technician {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  city: string;
  distanceKm: number;
  experienceYears: number;
  priceFrom: number;
  avatar: string;
  verified: boolean;
}

export interface ServiceCenter {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  city: string;
  distanceKm: number;
  clientsCount: string;
  priceFrom: number;
  logo: string;
  verified: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  rating: number;
  comment: string;
}

import avatar1 from "../assets/avatars/avatar1.svg";
import avatar2 from "../assets/avatars/avatar2.svg";
import avatar3 from "../assets/avatars/avatar3.svg";
import avatar4 from "../assets/avatars/avatar4.svg";
import avatar5 from "../assets/avatars/avatar5.svg";
import avatar6 from "../assets/avatars/avatar6.svg";
import avatar7 from "../assets/avatars/avatar7.svg";
import avatar8 from "../assets/avatars/avatar8.svg";

const localAvatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
];

const avatar = (index: number) => localAvatars[index % localAvatars.length];

export const technicians: Technician[] = Array.from({ length: 20 }).map(
  (_, i) => ({
    id: `tech-${i + 1}`,
    name: "محمد احمد",
    specialty: "فني اجهزة منزلية",
    rating: 4.9,
    city: "القاهرة",
    distanceKm: 10 + (i % 5),
    experienceYears: 4,
    priceFrom: 200,
    avatar: avatar(i),
    verified: true,
  })
);

export const serviceCenters: ServiceCenter[] = Array.from({ length: 20 }).map(
  (_, i) => ({
    id: `center-${i + 1}`,
    name: "مركز السلام للصيانة",
    specialty: "صيانة جميع الاجهزة الكهربائية",
    rating: 4.9,
    city: "القاهرة",
    distanceKm: 4 + (i % 5),
    clientsCount: "٥٠٠+",
    priceFrom: 200,
    logo: "COMPASS",
    verified: true,
  })
);

export const reviews: Review[] = Array.from({ length: 3 }).map((_, i) => ({
  id: `review-${i + 1}`,
  authorName: "احمد علي",
  authorAvatar: avatar(i + 3),
  date: "٢١/٠٧/٢٠٢٦",
  rating: 4.9,
  comment:
    "خدمة ممتازة وسريعة وصل الفني في الموعد المحدد وقام بالفحص والاصلاح باحترافية عالية اسعار مناسبة جدا وجودة في العمل",
}));

export const brandLogos = ["ZANUSSI", "ZANUSSI", "ZANUSSI", "ZANUSSI"];
