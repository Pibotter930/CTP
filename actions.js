import { HttpError } from 'wasp/server'

export const createLink = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newLink = await context.entities.Link.create({
    data: {
      url: args.url,
      photo: args.photo,
      rating: args.rating,
      userId: context.user.id,
      categoryId: args.categoryId
    }
  });

  return newLink;
}

export const updateLink = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const link = await context.entities.Link.findUnique({
    where: { id: args.id }
  });
  if (link.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Link.update({
    where: { id: args.id },
    data: { url: args.url, photo: args.photo, rating: args.rating, categoryId: args.categoryId }
  });
}

export const deleteLink = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const link = await context.entities.Link.findUnique({
    where: { id: args.linkId }
  });
  if (link.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Link.delete({
    where: { id: args.linkId }
  });
}