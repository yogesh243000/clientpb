const Footer = () => {
  return (
    <>
      <div className="">
        <p className="text-center text-gray-200 bg-gray-700 p-4 text-sm">
          &copy;
          {new Date().getFullYear()} All Right Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
