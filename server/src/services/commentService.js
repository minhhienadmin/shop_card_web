export const createComment = async (commentData) => {
  try {
    const { userId, productId, text, img } = commentData;

    const comment = await db.Comment.create({
      userId,
      productId,
      text,
      img,
    });

    return {
      err: 0,
      mes: 'Comment created',
      comment: comment.toJSON(),
    };
  } catch (error) {
    return {
      err: 1,
      mes: error.message,
    };
  }
};


export const deleteComment = async (commentId) => {
try {
  const comment = await db.Comment.findByPk(commentId);

  if (!comment) {
  return {
      err: 1,
      mes: 'Comment not found',
  };
  }

  await comment.destroy();

  return {
  err: 0,
  mes: 'Comment deleted',
  };
} catch (error) {
  return {
  err: 1,
  mes: error.message,
  };
}
};

export const getCommentsByProductId = async (productId) => {
  try {
    const comments = await db.Comment.findAll({
      where: {
        productId: productId,
      },
      include: [
        {
          model: db.User,
          attributes: ['id', 'username'],
        },
      ],
    });

    return {
      err: 0,
      mes: 'Comments found',
      comments: comments.map((comment) => comment.toJSON()),
    };
  } catch (error) {
    return {
      err: 1,
      mes: error.message,
    };
  }
};
