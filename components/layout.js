import Head from 'next/head'

const siteTitle = 'Administrasjonspanel'

export default function Layout({ user, loading = false, children }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width' />
      </Head>

      <main>
        <div className='container'>{children}</div>
      </main>
    </>
  )
}
