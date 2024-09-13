import React from 'react';
import Thankyou from '@/components/ProfilePage/thankyou';

function ProfilePage() {
  return (
    <div className="max-w-md mx-auto p-4 md:p-6 lg:p-8 bg-white rounded shadow-md">
      <div className="flex flex-col items-center">
        <img
          src="https://picsum.photos/200/300"
          alt="Profile Image"
          className="w-32 h-32 rounded-full object-cover object-center"
        />
        <h2 className="text-lg font-bold mt-4">John Doe</h2>
        <p className="text-gray-600">Software Engineer</p>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-bold">About Me</h3>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
        </p>
      </div>
    
    </div>
  );
}

export default ProfilePage;