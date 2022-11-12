import * as React from 'react';

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  return (
    <div className='h-full w-full border border-red-600'>
      <section>
        <h3>Favorite Repos</h3>
        <ul>
          <li>Repo 1</li>
          <li>Repo 2</li>
          <li>Repo 3</li>
        </ul>
      </section>
      <section>
        <h3>Watching</h3>
      </section>
      <section>
        <p>Activity Feed</p>
      </section>
    </div>
  );
};

export default Profile;
