/**
 * @file app/dangky/page.tsx
 * @description Short VN URL redirect → /sell/register. Used for SMS/Zalo shares.
 */

import { redirect } from 'next/navigation';

export default function DangKyRedirect() {
  redirect('/sell/register');
}

export const metadata = {
  title: 'Đăng ký Pany Kids — kids.panyvn.app/dangky',
  robots: { index: false, follow: false },
};
