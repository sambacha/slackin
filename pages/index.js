import { getData, useData } from '../utils/hooks'
import Head from '../components/head'
import Splash from '../components/splash'
import Logos from '../components/logos'
import Users from '../components/users'
import InviteForm from '../components/invite-form'

const Index = ({ name, logo, channels, large, coc }) => {
  const data = useData()
  const { users } = data || {}

  return (
    <>
      <Head name={name} />

      <Splash>
        <Logos logo={logo} />

        <p>
          Join <b>{name}</b> {channels && channels.length === 1 && <span>#{channels[0]}</span>} on
          Slack.
        </p>

        {users && <Users users={users}></Users>}

        <InviteForm channels={channels} coc={coc} />

        <p className="signin">
          or{' '}
          <a href={`https://${name}.slack.com`} target="_top">
            sign in
          </a>
          .
        </p>

        <footer>
          Powered by{' '}
          <a href="http://rauchg.com/slackin" target="_blank" rel="noopener noreferrer">
            slackin
          </a>
        </footer>
      </Splash>

      <style jsx global>{`
        html {
          font-size: ${large ? '14px' : '10px'};
        }
        p {
          font-size: 1.5rem;
          margin: 0.5rem 0;
        }
      `}</style>
      <style jsx>{`
        .logos {
          position: relative;
          margin-bottom: 4rem;
        }
      `}</style>
    </>
  )
}

Index.getInitialProps = async function() {
  const slack = await getData()
  const { name, logo } = slack.org
  const channels = ['best-channel']

  return { name, logo, channels, large: true, coc: 'https://nextjs.org/' }
}

export default Index
