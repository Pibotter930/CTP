import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useAction, getLinks, updateLink } from 'wasp/client/operations';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { data: links, isLoading, error } = useQuery(getLinks, { categoryId });
  const updateLinkFn = useAction(updateLink);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateLink = (linkId, newRating) => {
    updateLinkFn({ linkId, rating: newRating });
  };

  return (
    <div className='p-4'>
      {links.map((link) => (
        <div key={link.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{link.url}</div>
          <div>
            <input type='number' value={link.rating} onChange={(e) => handleUpdateLink(link.id, e.target.value)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryPage;