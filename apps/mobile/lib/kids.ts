// Kid types + default data — keep in sync with web's DEFAULT_KIDS

export interface Kid {
  id: string;
  name: string;
  age: number;
  color: string;
  emoji: string;
  pin: string;
  birthday?: string;
  school?: string;
  hobbies?: string;
  goals?: string;
  bio?: string;
  favoriteSubject?: string;
}

export const DEFAULT_KIDS: Kid[] = [
  { id: 'kid_1', name: 'Phúc', age: 11, color: '#FF6B9D', emoji: '🌟', pin: '1111', bio: 'Trần Hạnh Phúc', school: 'Lên lớp 6 (9/2026)', birthday: '2015-06-26' },
  { id: 'kid_2', name: 'An',   age: 9,  color: '#4DABF7', emoji: '🚀', pin: '2222', bio: 'Trần Bình An',   school: 'Lên lớp 4 (9/2026)', birthday: '2017-08-30' },
  { id: 'kid_3', name: 'Y',    age: 5,  color: '#51CF66', emoji: '🎨', pin: '3333', bio: 'Trần Như Ý',     school: 'Vào lớp lá (9/2026)', birthday: '2020-02-28' },
];
