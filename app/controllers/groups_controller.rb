class GroupsController < ApplicationController

  before_action :set_group, only: [:edit, :updata]

  def index
  end

  def new
    @group = Group.new
    @group.users << current_user #現在のuserを入れていく
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループが作成されました'#saveに成功したら表示される
    else
      render :new #失敗したらもう一度作成画面へ
    end
  end

  def edit
  end

  def updata
    if @group.update(group_params)
      edirect_to group_messages_path(@group), notice: '編集できました'#saveに成功したら表示される
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { user_ids:  [] })
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
