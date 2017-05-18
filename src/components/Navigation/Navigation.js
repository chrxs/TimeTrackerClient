import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'

import NavButton from 'components/NavButton'
import UserMenu from 'components/UserMenu'
import styles from './Navigation.scss'

const icons = {
  clock: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNjIgNjMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgPHBhdGggZD0iTTM2LjAwMDA0MjksMTcuMTQyODA5NiBMMzYuMDAwMDQyOSwzNS4xNDI4MzExIEMzNi4wMDAwNDI5LDM1Ljg2NjA0NjIgMzUuNDM3NTQyMiwzNi40Mjg1NDY5IDM0LjcxNDMyNzEsMzYuNDI4NTQ2OSBMMjEuODU3MTY4OSwzNi40Mjg1NDY5IEMyMS4xMzM5NTM4LDM2LjQyODU0NjkgMjAuNTcxNDUzMSwzNS44NjYwNDYyIDIwLjU3MTQ1MzEsMzUuMTQyODMxMSBMMjAuNTcxNDUzMSwzMi41NzEzOTk1IEMyMC41NzE0NTMxLDMxLjg0ODE4NDMgMjEuMTMzOTUzOCwzMS4yODU2ODM2IDIxLjg1NzE2ODksMzEuMjg1NjgzNiBMMzAuODU3MTc5NiwzMS4yODU2ODM2IEwzMC44NTcxNzk2LDE3LjE0MjgwOTYgQzMwLjg1NzE3OTYsMTYuNDE5NTk0NSAzMS40MTk2ODAzLDE1Ljg1NzA5MzggMzIuMTQyODk1NSwxNS44NTcwOTM4IEwzNC43MTQzMjcxLDE1Ljg1NzA5MzggQzM1LjQzNzU0MjIsMTUuODU3MDkzOCAzNi4wMDAwNDI5LDE2LjQxOTU5NDUgMzYuMDAwMDQyOSwxNy4xNDI4MDk2IFogTTUyLjcxNDM0ODYsMzEuMjg1NjgzNiBDNTIuNzE0MzQ4NiwxOS4yMzIwOTc4IDQyLjkxMDc2NTQsOS40Mjg1MTQ3MiAzMC44NTcxNzk2LDkuNDI4NTE0NzIgQzE4LjgwMzU5MzgsOS40Mjg1MTQ3MiA5LjAwMDAxMDczLDE5LjIzMjA5NzggOS4wMDAwMTA3MywzMS4yODU2ODM2IEM5LjAwMDAxMDczLDQzLjMzOTI2OTQgMTguODAzNTkzOCw1My4xNDI4NTI1IDMwLjg1NzE3OTYsNTMuMTQyODUyNSBDNDIuOTEwNzY1NCw1My4xNDI4NTI1IDUyLjcxNDM0ODYsNDMuMzM5MjY5NCA1Mi43MTQzNDg2LDMxLjI4NTY4MzYgWiBNNjEuNzE0MzU5MywzMS4yODU2ODM2IEM2MS43MTQzNTkzLDQ4LjMyMTQxODIgNDcuODkyOTE0Miw2Mi4xNDI4NjMzIDMwLjg1NzE3OTYsNjIuMTQyODYzMyBDMTMuODIxNDQ1LDYyLjE0Mjg2MzMgMCw0OC4zMjE0MTgyIDAsMzEuMjg1NjgzNiBDMCwxNC4yNDk5NDkgMTMuODIxNDQ1LDAuNDI4NTAzOTkgMzAuODU3MTc5NiwwLjQyODUwMzk5IEM0Ny44OTI5MTQyLDAuNDI4NTAzOTkgNjEuNzE0MzU5MywxNC4yNDk5NDkgNjEuNzE0MzU5MywzMS4yODU2ODM2IFoiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4gIDwvZz48L3N2Zz4=',
  users: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzggNzMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgPHBhdGggZD0iTTIzLjgyNTkyMTMsMzYuMjg1NjgzNiBDMTkuNjQ3MzQ0OSwzNi40MDYyMTk1IDE1Ljg3MDU1NDYsMzguMjE0MjU3NCAxMy4xNzg1ODcxLDQxLjQyODU0NjkgTDcuNzk0NjUyMTUsNDEuNDI4NTQ2OSBDMy43NzY3OTAyMiw0MS40Mjg1NDY5IDMuOTQxNjE3ZS0xNiwzOS40OTk5NzMyIDMuOTQxNjE3ZS0xNiwzNS4wNDAxNDY0IEMzLjk0MTYxN2UtMTYsMzEuNzg1Njc4MyAtMC4xMjA1MzU4NTgsMjAuODU3MDkzOCA0Ljk4MjE0ODgsMjAuODU3MDkzOCBDNS44MjU4OTk4LDIwLjg1NzA5MzggMTAuMDA0NDc2MiwyNC4yNzIyNzY1IDE1LjQyODU4OTgsMjQuMjcyMjc2NSBDMTcuMjc2ODA2MywyNC4yNzIyNzY1IDE5LjA0NDY2NTYsMjMuOTUwODQ3NSAyMC43NzIzNDYyLDIzLjM0ODE2ODIgQzIwLjY1MTgxMDMsMjQuMjMyMDk3OCAyMC41NzE0NTMxLDI1LjExNjAyNzUgMjAuNTcxNDUzMSwyNS45OTk5NTcxIEMyMC41NzE0NTMxLDI5LjY1NjIxMTQgMjEuNzM2NjMzMSwzMy4yNzIyODcyIDIzLjgyNTkyMTMsMzYuMjg1NjgzNiBaIE02Ni44NTcyMjI2LDYxLjg3OTQ2NDEgQzY2Ljg1NzIyMjYsNjguMzg4NDAwNSA2Mi41NTgxMTAzLDcyLjI4NTcyNjUgNTYuMTI5NTMxMiw3Mi4yODU3MjY1IEwyMS4wMTM0MTc5LDcyLjI4NTcyNjUgQzE0LjU4NDgzODgsNzIuMjg1NzI2NSAxMC4yODU3MjY1LDY4LjM4ODQwMDUgMTAuMjg1NzI2NSw2MS44Nzk0NjQxIEMxMC4yODU3MjY1LDUyLjc5OTA5NjIgMTIuNDE1MTkzNCwzOC44NTcxMTUzIDI0LjE4NzUyODgsMzguODU3MTE1MyBDMjUuNTUzNjAxOSwzOC44NTcxMTUzIDMwLjUzNTc1MDcsNDQuNDQxOTQzNCAzOC41NzE0NzQ2LDQ0LjQ0MTk0MzQgQzQ2LjYwNzE5ODQsNDQuNDQxOTQzNCA1MS41ODkzNDcyLDM4Ljg1NzExNTMgNTIuOTU1NDIwMywzOC44NTcxMTUzIEM2NC43Mjc3NTU3LDM4Ljg1NzExNTMgNjYuODU3MjIyNiw1Mi43OTkwOTYyIDY2Ljg1NzIyMjYsNjEuODc5NDY0MSBaIE0yNS43MTQzMTY0LDEwLjU3MTM2NzMgQzI1LjcxNDMxNjQsMTYuMjM2NTUyNiAyMS4wOTM3NzUxLDIwLjg1NzA5MzggMTUuNDI4NTg5OCwyMC44NTcwOTM4IEM5Ljc2MzQwNDUsMjAuODU3MDkzOCA1LjE0Mjg2MzI3LDE2LjIzNjU1MjYgNS4xNDI4NjMyNywxMC41NzEzNjczIEM1LjE0Mjg2MzI3LDQuOTA2MTgxOTQgOS43NjM0MDQ1LDAuMjg1NjQwNzE3IDE1LjQyODU4OTgsMC4yODU2NDA3MTcgQzIxLjA5Mzc3NTEsMC4yODU2NDA3MTcgMjUuNzE0MzE2NCw0LjkwNjE4MTk0IDI1LjcxNDMxNjQsMTAuNTcxMzY3MyBaIE01NC4wMDAwNjQ0LDI1Ljk5OTk1NzEgQzU0LjAwMDA2NDQsMzQuNTE3ODI0NCA0Ny4wODkzNDE4LDQxLjQyODU0NjkgMzguNTcxNDc0Niw0MS40Mjg1NDY5IEMzMC4wNTM2MDczLDQxLjQyODU0NjkgMjMuMTQyODg0NywzNC41MTc4MjQ0IDIzLjE0Mjg4NDcsMjUuOTk5OTU3MSBDMjMuMTQyODg0NywxNy40ODIwODk4IDMwLjA1MzYwNzMsMTAuNTcxMzY3MyAzOC41NzE0NzQ2LDEwLjU3MTM2NzMgQzQ3LjA4OTM0MTgsMTAuNTcxMzY3MyA1NC4wMDAwNjQ0LDE3LjQ4MjA4OTggNTQuMDAwMDY0NCwyNS45OTk5NTcxIFogTTc3LjE0Mjk0OTEsMzUuMDQwMTQ2NCBDNzcuMTQyOTQ5MSwzOS40OTk5NzMyIDczLjM2NjE1ODksNDEuNDI4NTQ2OSA2OS4zNDgyOTcsNDEuNDI4NTQ2OSBMNjMuOTY0MzYyLDQxLjQyODU0NjkgQzYxLjI3MjM5NDUsMzguMjE0MjU3NCA1Ny40OTU2MDQzLDM2LjQwNjIxOTUgNTMuMzE3MDI3OCwzNi4yODU2ODM2IEM1NS40MDYzMTYsMzMuMjcyMjg3MiA1Ni41NzE0OTYsMjkuNjU2MjExNCA1Ni41NzE0OTYsMjUuOTk5OTU3MSBDNTYuNTcxNDk2LDI1LjExNjAyNzUgNTYuNDkxMTM4OCwyNC4yMzIwOTc4IDU2LjM3MDYwMjksMjMuMzQ4MTY4MiBDNTguMDk4MjgzNSwyMy45NTA4NDc1IDU5Ljg2NjE0MjgsMjQuMjcyMjc2NSA2MS43MTQzNTkzLDI0LjI3MjI3NjUgQzY3LjEzODQ3MjksMjQuMjcyMjc2NSA3MS4zMTcwNDkzLDIwLjg1NzA5MzggNzIuMTYwODAwMywyMC44NTcwOTM4IEM3Ny4yNjM0ODUsMjAuODU3MDkzOCA3Ny4xNDI5NDkxLDMxLjc4NTY3ODMgNzcuMTQyOTQ5MSwzNS4wNDAxNDY0IFogTTcyLjAwMDA4NTgsMTAuNTcxMzY3MyBDNzIuMDAwMDg1OCwxNi4yMzY1NTI2IDY3LjM3OTU0NDYsMjAuODU3MDkzOCA2MS43MTQzNTkzLDIwLjg1NzA5MzggQzU2LjA0OTE3NCwyMC44NTcwOTM4IDUxLjQyODYzMjcsMTYuMjM2NTUyNiA1MS40Mjg2MzI3LDEwLjU3MTM2NzMgQzUxLjQyODYzMjcsNC45MDYxODE5NCA1Ni4wNDkxNzQsMC4yODU2NDA3MTcgNjEuNzE0MzU5MywwLjI4NTY0MDcxNyBDNjcuMzc5NTQ0NiwwLjI4NTY0MDcxNyA3Mi4wMDAwODU4LDQuOTA2MTgxOTQgNzIuMDAwMDg1OCwxMC41NzEzNjczIFoiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4gIDwvZz48L3N2Zz4=',
  projects: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNjcgNTciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgPHBhdGggZD0iTTY2Ljg1NzIyMjYsMTkuNzE0MjQxMyBDNjYuODU3MjIyNiwxNC43NzIyNzExIDYyLjc5OTE4MiwxMC43MTQyMzA1IDU3Ljg1NzIxMTgsMTAuNzE0MjMwNSBMMzAuODU3MTc5NiwxMC43MTQyMzA1IEwzMC44NTcxNzk2LDkuNDI4NTE0NzIgQzMwLjg1NzE3OTYsNC40ODY1NDQ1NCAyNi43OTkxMzkxLDAuNDI4NTAzOTkgMjEuODU3MTY4OSwwLjQyODUwMzk5IEw5LjAwMDAxMDczLDAuNDI4NTAzOTkgQzQuMDU4MDQwNTUsMC40Mjg1MDM5OSAwLDQuNDg2NTQ0NTQgMCw5LjQyODUxNDcyIEwwLDQ3Ljk5OTk4OTMgQzAsNTIuOTQxOTU5NCA0LjA1ODA0MDU1LDU3IDkuMDAwMDEwNzMsNTcgTDU3Ljg1NzIxMTgsNTcgQzYyLjc5OTE4Miw1NyA2Ni44NTcyMjI2LDUyLjk0MTk1OTQgNjYuODU3MjIyNiw0Ny45OTk5ODkzIEw2Ni44NTcyMjI2LDE5LjcxNDI0MTMgWiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPiAgPC9nPjwvc3ZnPg=='
}

const Navigation = ({
  currentUser,
  signOut,
  className
}) => {
  return (
    <nav className={compact([styles.Navigation, className]).join(' ')}>
      <ul>
        <li>
          <NavButton to='/' label='MY TIME' icon={icons.clock} />
        </li>
        <li>
          <NavButton to='/people' label='PEOPLE' icon={icons.users} />
        </li>
        <li>
          <NavButton exact={false} to='/projects' label='PROJECTS' icon={icons.projects} />
        </li>
        <li>
          <div className={styles.NavButtons}>
            <UserMenu currentUser={currentUser} signOut={signOut} />
          </div>
        </li>
      </ul>
    </nav>
  )
}

Navigation.displayName = 'Navigation'

Navigation.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  signOut: PropTypes.func.isRequired,
  className: PropTypes.string
}

Navigation.defaultProps = {
  className: ''
}

export default Navigation
