class Group < ApplicationRecord
  has_many :messages
  has_many :group_users
  has_many :users, through: :group_users
  validates :name, presence: true, uniqueness: true

  def show_last_message
    if (last_message = messages.last).present?#last_messageにmeassges.lastを代入する。プラス投稿されているか確認する。
      last_message.content? ? last_message.content: '画像が投稿されています'#三項演算子を使用する
    else
      'まだメッセージは投稿されていません'
    end
  end
end
