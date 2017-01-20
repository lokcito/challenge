require 'sinatra'
#require 'sinatra/reloader'

#set :public_folder, Proc.new { File.join(root, "public") }
#set :views, Proc.new { File.join(root, "views") }
set :static_cache_control, [:public, :max_age => 300]

get '/' do
	@title = 'My Challenge'
	erb :index
end