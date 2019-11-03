const { TagBoard } = require("../models");

// Returns a list of all tagboards
exports.getTagBoards = async (request, response) => {
  try {
    const boards = await TagBoard.find({ author: request.user.id });
    return response.status(200).json(boards);
  } catch (error) {
    return response.status(500).json(error);
  }
};

// Post a new tag board.
// Returns a list of all tagboards
exports.createTagBoard = async (request, response) => {
  try {
    await createTagDocument(request).save();
    return await this.getTagBoards(request, response);
  } catch (error) {
    return response.status(500).json(error);
  }
};

// PUT new tags or update title
// returns a list of all tagboards
exports.updateTagBoard = async (request, response) => {
  const { title, tags } = request.body;

  const updatedBoard = {
    title,
    tags,
    lastEditDate: new Date().toISOString()
  };

  try {
    await TagBoard.findOneAndUpdate(
      { id: request.params.boardId },
      updatedBoard,
      { new: true }
    );

    return this.getTagBoards(request, response);
  } catch (error) {
    return response.status(500).json(error);
  }
};

exports.deleteTagBoard = async (request, response) => {};

const createTagDocument = request => {
  const { title, tags } = request.body;

  const tagBoard = new TagBoard({
    title,
    tags,
    author: request.user
  });

  return tagBoard;
};
