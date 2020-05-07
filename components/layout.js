import Head from 'next/head'
import Nav from './nav'

const siteTitle = 'Administrasjonspanel'

export default function Layout({ user, loading = false, children }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width' />
      </Head>

      <Nav user={user} loading={loading} />

      <main>
        <div className='container'>{children}</div>
      </main>
    </>
  )
}
