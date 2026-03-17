import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-page py-16">
      <h1 className="text-3xl font-bold">Not found</h1>
      <p className="mt-2 text-slate-600">That page does not exist (or the CMS record is missing).</p>
      <Link href="/" className="mt-6 inline-flex rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
        Home
      </Link>
    </div>
  )
}
