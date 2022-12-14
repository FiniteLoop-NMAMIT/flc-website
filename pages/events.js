import EventList from '../components/events';
import { Fade } from 'react-reveal';

export default function events() {
  return (
    <>
      <Fade top cascade>
        <div className="flex flex-col justify-center items-center gap-3 px-10 pb-5">
          <h1 className="heading text-5xl font-bold">Events</h1>
          <p className="lg:text-xl lg:w-1/2 text-center text-black dark:text-gray-50">
            We have successfully reached out many technical workshops. As we
            reflect back, here are some of the events organized by the club!
          </p>
        </div>
      </Fade>
      <EventList />
      <hr className="border-gray-500/50" />
    </>
  );
}
