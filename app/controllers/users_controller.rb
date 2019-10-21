class UsersController < ApplicationController

  def edit
  end

  def update
    if current_user.updata(user_params)
      redirect_to root_path#もしアップデートに成功したら、pathへredirectする。
    else
      render :edit#updataができなかったら、editへ戻る
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
