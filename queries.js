import { HttpError } from 'wasp/server'

export const getLinks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const links = await context.entities.Link.findMany({
    where: {
      categoryId: args.categoryId,
      user: { id: context.user.id }
    }
  });

  return links;
}

export const getLink = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const link = await context.entities.Link.findUnique({
    where: { id: args.linkId },
    include: { user: true }
  });

  if (!link || link.user.id !== context.user.id) { throw new HttpError(400) }

  return link;
}