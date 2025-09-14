export default function Home() {
  const featuredPost = [
    {
      image: '/test.jpg',
      title: 'Revolutionizing industries through SaaS implementation',
    },
    {
      image: '/test.jpg',
      title: 'Synergizing saas and UX design for elevating digital experiences',
    },
    {
      image: '/test.jpg',
      title: 'Navigating saas waters with intuitive UI and UX',
    },
    {
      image: '/test.jpg',
      title: 'Sculpting saas success - the art of UI and UX design',
    },
    {
      image: '/test.jpg',
      title: 'Transforming saas platforms - a UI/UX design odyssey',
    },
  ];

  const allposts = [
    {
      image: '/test.jpg',
      title: 'Mastering UI Elements: A Practical Guide for Designers',
      description:
        'Dive into the world of user interfaces with our expert guides, latest trends, and practical tips.',
      author: 'Jennifer Taylor',
      readTime: '3 min read',
    },
    {
      image: '/test.jpg',
      title: 'Crafting Seamless Experiences: The Art of Intuitive UI Design',
      description:
        'Explore the principles and techniques that drive user-centric UI design, ensuring a seamless and intuitive experience.',
      author: 'Jennifer Taylor',
      readTime: '5 min read',
    },
    {
      image: '/test.jpg',
      title: 'Beyond Aesthetics: The Power of Emotional UX Design',
      description:
        'Delve into the realm of emotional design and discover how incorporating empathy and psychology creates meaningful connections.',
      author: 'Ryan A.',
      readTime: '2 min read',
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Main Content Container */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* Hero Section */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
          {/* Main Featured Post */}
          <div className='lg:col-span-2 py-3'>
            <div className='bg-[url("/test.jpg")] bg-cover bg-center w-full h-96 rounded-2xl relative overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 rounded-2xl'></div>
              <div className='absolute bottom-6 left-6 text-white'>
                <span className='bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block'>
                  Business
                </span>
                <h1 className='text-3xl font-bold leading-tight'>
                  Unlocking Business Efficiency with SaaS Solutions
                </h1>
              </div>
            </div>
          </div>

          {/* Other Featured Posts Sidebar */}
          <div className='lg:col-span-1'>
            <h2 className='text-xl font-bold text-gray-800 mb-6'>
              Other featured posts
            </h2>
            <div className='space-y-4'>
              {featuredPost.map((post, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <div className='w-20 h-16 bg-gray-300 rounded-lg overflow-hidden flex-shrink-0'>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <a
                    href='#'
                    className='text-gray-900 hover:text-gray-700 text-xl font-semibold leading-tight'>
                    {post.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Posts Section */}
        <div className='mb-8'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>Recent Posts</h2>
            <button className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'>
              All Posts
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {allposts.map((post, index) => (
              <article
                key={index}
                className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                <div className='aspect-video bg-gray-200 overflow-hidden'>
                  <img
                    src={post.image}
                    alt={post.title}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-lg font-bold text-gray-800 mb-2 line-clamp-2'>
                    {post.title}
                  </h3>
                  <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                    {post.description}
                  </p>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
                    <div className='text-sm text-gray-500'>
                      <div className='font-medium'>{post.author}</div>
                      <div>{post.readTime}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
