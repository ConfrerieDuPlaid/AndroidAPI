import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { HttpUtils } from '../shared/utils/http.utils';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  private commentEndpoint = 'https://store.steampowered.com/appreviews';
  private userEndpoint =
    'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/';

  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  async findAllForGame(appid: string): Promise<Comment[]> {
    const results = await HttpUtils.get(
      this.commentEndpoint + `/${appid}?json=1`,
    );

    const usernames: Map<string, string> = new Map<string, string>();
    for (const commentData of results['reviews']) {
      const username = await this.getUsername(commentData['author']['steamid']);
      usernames.set(commentData['author']['steamid'], username);
    }

    return results['reviews'].map((commentData) => {
      const comment: Comment = new Comment();
      comment.author = usernames.get(commentData['author']['steamid']);
      comment.voteScore = commentData['weighted_vote_score'];
      comment.content = commentData['review'];
      return comment;
    });
  }

  async getUsername(steamUserid: string): Promise<string> {
    const userEndpointParams = `?key=${'81CB7F5E1E14FA788F1EE13B4EBDDC63'}&format=json&steamids=${steamUserid}`;
    const results = await HttpUtils.get(this.userEndpoint + userEndpointParams);
    return results['response']['players'][0]['personaname'];
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
