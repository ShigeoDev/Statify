export default function About() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <div className="spotifygreen w-60 h-[8rem] rounded-full flex justify-center items-center">
        <h1 className="text-4xl font-bold text-center">About</h1>
      </div>
      <p className="text-xl text-center px-10 max-w-5xl leading-9">
        This web app is designed to easily deliver information about a user&apos;s Spotify account. No data about the user is stored. If you are interested, the source code for this web app is <span className="text-[--spotifygreen]"><a href="https://github.com/ShigeoDev/Statify" target="_blank">here</a></span>.
      </p>
    </div>
  );
}
