const Hero = () => {
  return (
    <section>
      <video
        src={"/video/bannner.mp4"}
        autoPlay
        muted
        playsInline
        className="block h-full w-full object-cover"
        controls={false}
      >
      </video>
    </section>
  );
};
export default Hero;
