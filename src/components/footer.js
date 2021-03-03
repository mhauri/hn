export const Footer = () => {
  return (
    <footer className="py-6 mx-auto max-w-3xl px-4 md:px-0 grid grid-cols-2 text-black dark:text-gray-300">
      <span className="">
        Code and Design by{" "}
        <a
          href="https://hauri.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white border-b border-dashed border-gray-400"
        >
          Marcel Hauri
          </a>
      </span>
      <span className="text-right">
        <a
          href="https://github.com/mhauri/hn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white border-b border-dashed border-gray-400"
        >
        Source
      </a>
      </span>

    </footer>
  )
}

export default Footer;
