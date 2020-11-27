import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Text } from 'react-native';

const GET_CURRENT_USER = gql`
  {
    items {
      edges {
        title
      }
    }
  }
`;

//query example
//console.log(items.edges[0].title);

//<Query query={GET_CURRENT_USER}>

const Profile = () =>
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error }) => {
      const { items } = data;
      console.log(data);

      // TODO: import loading common component
      //if (loading || !viewer) {
      if (loading) {
        return <Text>Loading ...</Text>;
      }

      return (
        <Text>
          items.edges[0].title;
        </Text>
      );
    }}
  </Query>

export default Profile;
