import React from 'react';
import { useQuery, useAction, getLink, createLink, updateLink, deleteLink } from 'wasp/client/operations';

const AdminPage = () => {
  const { data: link, isLoading, error } = useQuery(getLink);
  const createLinkFn = useAction(createLink);
  const updateLinkFn = useAction(updateLink);
  const deleteLinkFn = useAction(deleteLink);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      Admin Page Content
    </div>
  );
}

export default AdminPage;