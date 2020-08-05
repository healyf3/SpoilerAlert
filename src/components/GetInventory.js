import React, { Component } from 'react';
import { View, Text } from 'react-native';

let SIGN_IN_REDIR = 'https://www.kingsoopers.com/signin?redirectUrl=/';
const SIGN_IN = 'https://www.kingsoopers.com/auth/api/sign-in';
let ECHO = 'https://www.kingsoopers.com/clickstream/v1/echoData';
const PURCHASES = 'https://www.kingsoopers.com/mypurchases';
let test_email = 'pafu0099@colorado.edu';
let test_pw = 'peterbuff1!';

class GetInventory extends Component {

  constructor(props) {
    super(props);
    this.state = { url: SIGN_IN, userEmail: test_email, userPassword: test_pw };
  }

  componentDidMount() {
    this.setUserPurchases(this.state);
  }

  setUserPurchases = async (st) => {
    //const res1 = await axios.get(SIGN_IN_REDIR);
    //console.log(res.data);
    //const token = (res1.headers['x-vcap-request-id']);
  //  const config = {
  //    method: 'post',
  //    url: 'https://www.kingsoopers.com'
  //  }
  //  const config = {
  //    headers: {
  //    authority: 'www.kingsoopers.com',
  //    method: 'POST',
  //    path: '/auth/api/sign-in',
  //    scheme: 'https',
  //    accept: 'application/json, text/plain, */*',
  //    'accept-encoding': 'gzip, deflate, br',
  //    'accept-language': 'en-US,en;q=0.9',
  //    'content-length': '80',
  //    'content-type': 'application/json;charset=UTF-8',
  //    origin: 'https://www.kingsoopers.com',
  //    referer: 'https://www.kingsoopers.com/signin?redirectUrl=/',
  //    'sec-fetch-dest': 'empty',
  //    'sec-fetch-mode': 'cors',
  //    'sec-fetch-site': 'same-origin',
  //    'Access-Control-Allow-Origin': '*',
  //      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
    //    'x-dtpc': '7$164032341_783h18vPVCWIJARJUNCFQTIHLPRRJTVCFLHEOGQ-0',
      //  'x-xsrf-token': token
    //  }
    //};

    //const data = {
    //  email: st.userEmail,
    //  password: st.userPassword,
    //  rememberMe: 'true'
  //  }
     // const browser = await puppeteer.launch();
    //  const page = await browser.newPage();
    //  await page.goto('https://google.com');
      //await page.screenshot({ path: 'example.png' });
    //console.log(res.headers.expires);
  //  const res = await axios.post(SIGN_IN, data).then((rs) => {
  //    console.log(rs);
  //  }, (error) => {
  //    console.log(error.response.data);
  //    console.log(error.response.headers);
  //  });
    //const res = await axios.get(SIGN_IN);
    //console.log(res.data);
//    const resp = await $.post(st.url, {
//      email: st.userName,
//      password: st.userPassword
//    }).then((res) =>{
//      console.log(res);
//    }, (error) => {
//      console.log(error);
//    });
//    const $ = await cheerio.load(res.data, {
//      normalizeWhitespace: true,
//      decodeEntities: true
//    })
//    { /*this.setState({ userData: $ }); * /}
    { /*console.log(JSON.stringify($('h2.title').find('chaaaange')));* /}
    { /*console.log(res_data('.kds-Text--m').text());*/ }
    //console.log($('h1').map(function () {
     // return $(this).attr('for');
    //}).get());
  //  console.log($('h1').text());
  }

  render() {
    return (
      <View>
        <Text>{this.state.userData}</Text>
      </View>
    );
  }
}

export default GetInventory;
