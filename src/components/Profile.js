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

      // TODO: import loading common component
      if (loading || !data) {
        return <Text>Loading ...</Text>;
      }

      const { items } = data;

      return (
        <Text>
          {items.edges[0].title}
        </Text>
      );
    }}
  </Query>

export default Profile;
