function Footer() {
  return (
    <footer className="bg-primary text-white p-4">
      <div className="container mx-auto">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Your App Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
