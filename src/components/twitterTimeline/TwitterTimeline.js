import React from 'react'
import PropTypes from 'prop-types'
import { Timeline } from 'react-twitter-widgets'
import './twitter-timeline.scss'

const propTypes = {}

const defaultProps = {}

export default class TwitterTimeline extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='twitter-timeline'>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'albaserah_7'
          }}
          options={{
            username: 'albaserah_7',
            height: '400'
          }}
          onLoad={() => console.log('Timeline is loaded!')}
        />
      </div>
    )
  }
}

TwitterTimeline.propTypes = propTypes
TwitterTimeline.defaultProps = defaultProps
