import React, { Component } from 'react';
import NetworkManager from '../api/NetworkManager';
import { Button, Input, Item, Container, CenteringContainer, TextBox, TextBoxStatus, AHref } from './App.styles';


class App extends Component {
  constructor(props) {
    super(props);
    this.network = new NetworkManager();
    this.state = {
      serverEnvironment: [
        {
          env: 'QE',
          code: '#qe',
          status: 'Free'
        }, {
          env: 'Stable',
          code: '#stable',
          status: 'Free'
        }, {
          env: 'Staging',
          code: '#staging',
          status: 'Free'
        },
      ],
      loadEvent: true,
      authUrl: '',
      calendarCode: ''
    }
    this.getEnvironmentStatus = this.getEnvironmentStatus.bind(this);
    this.timer = this.timer.bind(this);
    this.postCode = this.postCode.bind(this);
  }

  timer() {
    setInterval(() => {
      window.location.reload();
      this.getEnvironmentStatus();
    }, 60000);
  }

  componentDidMount() {
    this.getEnvironmentStatus();
    this.timer();
  }

  async getEnvironmentStatus() {
    if (!this.state.loadEvent) {
      return;
    }

    await this.network.getTodayActivities()
      .then(events => {
        if (events.resultCode && events.resultCode === -401) {
          this.setState({ loadEvent: false, authUrl: events.body.authUrl });
          return;
        }

        let updatedServerEnvironment = this.state.serverEnvironment.map(item => {
          let index = events.findIndex(x => x.code === item.code);

          item.status = events[index].summary;
          return item;
        })

        this.setState({ serverEnvironment: updatedServerEnvironment });
      })
      .catch(err => {
        console.log('hey, getEnvironmentStatus is getting error leh, try reload the page');
      });
  }

  postCode() {
    let code = this.state.calendarCode;
    if (!code) {
      alert('Invalid code');
      return;
    }


    this.network.postCode(code)
      .then(res => {
        if (res.resultCode === 1) {
          this.setState({ loadEvent: true, code: '' });
        }
      });
  }

  renderInputCode() {
    return (
      <CenteringContainer >
        <TextBox>Authorize this app by visiting this url:</TextBox>
        <AHref
          className="App-link"
          href={this.state.authUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {this.state.authUrl}
        </AHref>
        <Input onChange={(event) => { this.setState({ calendarCode: event.target.value }) }} />
        <Button onClick={this.postCode}>Submit</Button>
      </CenteringContainer>
    )
  }

  renderServerEnvironmentStatus() {
    return (
      <CenteringContainer flexDirection='row' alignItems='baseline' background='#f2f4f7'>
        {this.state.serverEnvironment.map((event, i) => {
          let itemColour = event.status === 'Free' ? '#FFF' : '#FF5B2D';
          let evnTextStatus = event.status !== 'Free' ? '#FFF' : null;
          return (
            <Item key={i} itemColor={itemColour}>
              <TextBox fontColor={evnTextStatus}>{event.env} </TextBox>
              <TextBoxStatus fontSize={'1.3rem'} fontColor={evnTextStatus}>{event.status}</TextBoxStatus>
            </Item>
          )
        })}
      </CenteringContainer>

    )
  }

  render() {
    return (
      <Container>
        {this.state.loadEvent ? this.renderServerEnvironmentStatus() : this.renderInputCode()}
      </Container>
    );
  }
}


export default App;
