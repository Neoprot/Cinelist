import prisma from "./prismaClient";

export const postSharedFavorites = async (
  user_id: string,
  username: string,
  email: string,
  movie_ids: string[]
) => {
  const sharedFavorite = await prisma.sharedFavorite.create({
    data: {
      user_id,
      username,
      email,
      movie_ids,
    },
  });

  return sharedFavorite;
};

export const getSharedFavorites = async (id: string) => {
  const sharedFavorite = await prisma.sharedFavorite.findUnique({
    where: { id },
  });

  return sharedFavorite;
};

export const syncSharedFavorites = async (user_id: string) => {
  const favorites = await prisma.favorite.findMany({
    where: { user_id },
    select: { movie_id: true },
  });

  const movie_ids = favorites.map((fav) => fav.movie_id.toString());

  const sharedFavorite = await prisma.sharedFavorite.updateMany({
    where: { user_id },
    data: { movie_ids },
  });

  return sharedFavorite;
};

export const checkSharedFavorites = async (user_id: string) => {
  const sharedFavorite = await prisma.sharedFavorite.findFirst({
    where: { user_id },
    select: { id: true },
  });

  return sharedFavorite ? { id: sharedFavorite.id } : { id: null };
};

export const excludeSharedFavorites = async (user_id: string) => {
  await prisma.sharedFavorite.deleteMany({
    where: { user_id },
  });
};
