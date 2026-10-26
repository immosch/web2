export type Athlete = {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  dateOfBirth: Date;
  weight: number;
  imageUrl?: string;
  sport: string;
  achievements?: string[];
};
