import React from 'react';
import { Loading } from '../atoms/icons/illustrations';
import { LoadingContainer } from '../atoms';
import { Notification } from '../organisms';

export default ({ location, close }) => (
  <Notification close={close}>
    <LoadingContainer>
      <Loading />
      Chargement…
    </LoadingContainer>
  </Notification>
);
