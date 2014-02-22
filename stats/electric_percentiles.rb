#calculate the average from the ../data/
require 'csv'

data = []
begin 
  CSV.foreach("../data/electric2.csv") do |row|
    data << row[4].to_i if row[4].to_i
  end
rescue Exception => e

end

data = data.sort

#Now calculate the CSV 
puts data.length
result = "["
(1..99).each do |integer|
  cutoff = (data.length / 100) * integer
  result = result + data[cutoff].to_s + ","
end
result = result + "]"
puts result
