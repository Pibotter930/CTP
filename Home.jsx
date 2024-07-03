import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'wasp/client/operations';
import { getLinks } from 'wasp/client/operations';

const HomePage = () => {
  const { data: links, isLoading, error } = useQuery(getLinks);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Welcome to MyPlants!</h1>
      <p className='text-lg mb-4'>MyPlants is an app where you can explore different game links in various categories.</p>
      <button
        onClick={() => window.open('https://t.me/MyPlantsSupport', '_blank')}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        Support Us
      </button>
      <div className='mt-8'>
        {links.map((link) => (
          <div key={link.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
            <div>{link.url}</div>
            <div>{link.photo}</div>
            <div>Rating: {link.rating}</div>
            <Link to={`/category/${link.categoryId}`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2'>Category</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;