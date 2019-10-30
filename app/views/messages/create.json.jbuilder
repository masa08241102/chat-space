json.(@message, :content, :image)
json.data @message.created_at.to_s(:datetime)
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id