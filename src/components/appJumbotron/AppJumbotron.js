
import React, { Component } from 'react'
import { Jumbotron, Button, Grid } from 'react-bootstrap'
import './app-jumbotron.scss'

class componentName extends Component {
  render () {
    return (
      <Grid>
        <Jumbotron>
          <h2>مرحبا أيها العالم!</h2>
          <br />
          {this.props.children}
          <p>
            <br />
          هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء .
          </p>
          <p>
            <Button bsStyle='primary'>المزيد</Button>
          </p>
        </Jumbotron>
      </Grid>

    )
  }
}

export default componentName
