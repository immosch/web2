// calculates current age based on date of birth
export function calculateAge(dateOfBirth: Date) {
  const birth = new Date(dateOfBirth);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--; // subtract one if birthday hasn't occurred yet this year
  return age;
}
