type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Album = {
  userId: number;
  id: number;
  title: string;
};

async function getUserPosts(userId: string): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

async function getUserAlbums(userId: string): Promise<Album[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/albums?userId=${userId}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch albums");
  }

  return res.json();
}

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [posts, albums] = await Promise.all([
    getUserPosts(id),
    getUserAlbums(id),
  ]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8">User Profile</h1>

      <p className="mb-6 text-gray-600">User ID: {id}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Posts</h2>

          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-bold mb-3 text-gray-800 leading-tight">
                  {post.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">{post.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Albums */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Albums</h2>

          <div className="space-y-4">
            {albums.map((album) => (
              <div key={album.id} className="bg-white shadow-md rounded-lg p-6">
                <p className="text-gray-700">{album.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
