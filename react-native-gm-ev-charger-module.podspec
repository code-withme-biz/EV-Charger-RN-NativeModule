require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-gm-ev-charger-module"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/nerdyfactory/gm-ev-charger-module.git.git", :tag => "#{s.version}" }

  s.source_files = "ios", "ios/*.{h,m,swift}"
  s.vendored_frameworks = 'ios/TMapSDK.framework'
  s.dependency "React-Core"
end
