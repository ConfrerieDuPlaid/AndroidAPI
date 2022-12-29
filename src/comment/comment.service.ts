import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { HttpUtils } from '../shared/utils/http.utils';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  private commentEndpoint = 'https://store.steampowered.com/appreviews';

  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  async findAllForGame(appid: string): Promise<Comment[]> {
    const results = await HttpUtils.get(
      this.commentEndpoint + `/${appid}?json=1`,
    );

    return results['reviews'].map((commentData) => {
      const comment: Comment = new Comment();
      comment.author = commentData['author']['steamid'];
      comment.voteScore = commentData['weighted_vote_score'];
      comment.content = commentData['review'];
      return comment;
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
